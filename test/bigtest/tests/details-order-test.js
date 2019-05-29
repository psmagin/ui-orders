import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PHYSICAL } from '../../../src/components/POLine/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';
import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import OrderEditPage from '../interactors/order-edit-page';
import LineEditPage from '../interactors/line-edit-page';
import OpenOrderConfirmationModal from '../interactors/PurchaseOrder/open-order-confirmation-modal';
import OpenOrderErrorModal from '../interactors/PurchaseOrder/open-order-error-modal';
import { ERROR_CODES } from '../../../src/components/Utils/order';
import LinesLimitModal from '../interactors/lines-limit-modal';
import { ORDER_TYPE } from '../../../src/components/PurchaseOrder/PODetails/FieldOrderType';
import { ID } from '../network/config';

const ADDRESS = 'TEST ADDRESS';
const OWNER_TEST_VALUE = 'some team';

describe('OrderDetailsPage', () => {
  setupApplication();
  const lineEditPage = new LineEditPage();
  const orderDetailsPage = new OrderDetailsPage();
  const orderEditPage = new OrderEditPage();
  const linesLimitModal = new LinesLimitModal();
  let order = null;
  let vendor = null;

  beforeEach(function () {
    vendor = this.server.create('vendor');
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.pending,
      orderType: ORDER_TYPE.ongoing,
      vendor: vendor.id,
      owner: OWNER_TEST_VALUE,
      billTo: ID,
      shipTo: ID,
    });

    this.visit(`/orders/view/${order.id}`);
  });

  it('displays the order number in the pane header', () => {
    expect(orderDetailsPage.title).to.include(order.poNumber);
  });

  it('displays Renewals accordion', () => {
    expect(orderDetailsPage.renewalsAccordion).to.be.true;
  });

  it('displays the Add Line button enabled', () => {
    expect(orderDetailsPage.addLineButton.isButton).to.equal(true);
    expect(orderDetailsPage.addLineButton.isDisabled).to.equal(false);
  });

  it('displays the owner', () => {
    expect(orderDetailsPage.owner.value).to.contain(OWNER_TEST_VALUE);
  });

  it('displays billTo and shipTo', () => {
    expect(orderDetailsPage.billTo.value).to.contain(ADDRESS);
    expect(orderDetailsPage.shipTo.value).to.contain(ADDRESS);
  });

  describe('clicking on edit', () => {
    beforeEach(async () => {
      await orderDetailsPage.editOrderButton.click();
    });

    it('should redirect to order edit page', () => {
      expect(orderEditPage.$root).to.exist;
    });
  });

  describe('Add Line button should be disabled for Closed orders', () => {
    let closedOrder = null;

    beforeEach(function () {
      closedOrder = this.server.create('order', { workflowStatus: WORKFLOW_STATUS.closed });

      this.visit(`/orders/view/${closedOrder.id}`);
    });

    it('Add Line button is disabled', () => {
      expect(orderDetailsPage.addLineButton.isDisabled).to.equal(true);
    });
  });

  describe('Add Line button should be disabled for Open orders', () => {
    let openOrder = null;

    beforeEach(function () {
      openOrder = this.server.create('order', { workflowStatus: WORKFLOW_STATUS.open });

      this.visit(`/orders/view/${openOrder.id}`);
    });

    it('Add Line button is disabled', () => {
      expect(orderDetailsPage.addLineButton.isDisabled).to.equal(true);
    });
  });

  describe('clicking on add Line', () => {
    beforeEach(async () => {
      await orderDetailsPage.addLineButton.click();
    });

    it('should redirect to add line page', () => {
      expect(lineEditPage.$root).to.exist;
    });
  });

  describe('clicking on add Line to open LinesLimit Modal', () => {
    let line = null;

    beforeEach(async function () {
      line = this.server.create('line', {
        order,
        orderFormat: PHYSICAL,
        cost: {
          quantityPhysical: 2,
        },
      });

      this.server.get(`${ORDERS_API}/${order.id}`, {
        ...order.attrs,
        compositePoLines: [line.attrs],
      });

      this.visit(`/orders/view/${order.id}`);
      await orderDetailsPage.addLineButton.click();
    });

    it('displays LineLimit Modal', () => {
      expect(linesLimitModal.$root).to.exist;
    });

    describe('Click on Create new PO button', () => {
      beforeEach(async function () {
        await linesLimitModal.createOrder();
      });

      it('displays PO Line edit page', () => {
        expect(lineEditPage.$root).to.exist;
      });
    });
  });

  describe('Open order action', () => {
    describe('button for pending order with at least one POL', () => {
      const openOrderConfirmationModal = new OpenOrderConfirmationModal();
      let line = null;

      beforeEach(async function () {
        const pendingOrder = await this.server.create('order', {
          workflowStatus: WORKFLOW_STATUS.pending,
        });

        line = await this.server.create('line', {
          order: pendingOrder,
          orderFormat: PHYSICAL,
          cost: {
            quantityPhysical: 2,
          },
        });
        const VENDOR_IS_INACTIVE_RESPONSE = {
          'errors': [{
            'message': 'Order cannot be open as the associated vendor is inactive',
            'code': ERROR_CODES.vendorIsInactive,
            'parameters': [],
            'id': '68baa952-ce78-49bb-b495-646482cf3483',
          }],
          'total_records': 1,
        };

        this.server.put(`${ORDERS_API}/:id`, VENDOR_IS_INACTIVE_RESPONSE, 422);

        this.server.get(`${ORDERS_API}/${pendingOrder.id}`, {
          ...pendingOrder.attrs,
          compositePoLines: [line.attrs],
        });

        this.visit(`/orders/view/${pendingOrder.id}`);
      });

      it('should be visible', () => {
        expect(orderDetailsPage.openOrderButton.isPresent).to.be.true;
      });

      describe('click action', () => {
        beforeEach(async () => {
          await orderDetailsPage.openOrderButton.click();
        });

        it('should open Open Order Confirmation Modal', () => {
          expect(openOrderConfirmationModal.isPresent).to.be.true;
        });
      });

      describe('click close action on modal', () => {
        beforeEach(async () => {
          await orderDetailsPage.openOrderButton.click();
          await openOrderConfirmationModal.cancelAction();
        });

        it('should close Open Order Confirmation Modal', () => {
          expect(openOrderConfirmationModal.isPresent).to.be.false;
        });
      });

      describe('click submit action on modal', () => {
        const openOrderErrorModal = new OpenOrderErrorModal();

        beforeEach(async () => {
          await orderDetailsPage.openOrderButton.click();
          await openOrderConfirmationModal.submitAction();
        });

        it('should close Open Order Confirmation Modal and open Error modal', () => {
          expect(openOrderErrorModal.isPresent).to.be.true;
          expect(openOrderConfirmationModal.isPresent).to.be.false;
        });
      });
    });

    Object.values(WORKFLOW_STATUS).forEach(status => {
      describe(`button for ${status} order without POLs`, () => {
        beforeEach(async function () {
          const newOrder = await this.server.create('order', {
            workflowStatus: status,
          });

          this.visit(`/orders/view/${newOrder.id}`);
        });

        it('should not be visible', () => {
          expect(orderDetailsPage.openOrderButton.isPresent).not.to.be.true;
        });
      });
    });
  });
});

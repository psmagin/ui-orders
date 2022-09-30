import user from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';

import { REEXPORT_SOURCES } from '../constants';
import { ReexportModal } from './ReexportModal';
import { useReexport } from '../hooks';

const vendorName = 'Test Vendor';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useOrganization: jest.fn(() => ({ name: vendorName, isLoading: false })),
}));
jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useReexport: jest.fn(() => ({
    reExport: jest.fn(),
    isLoading: false,
  })),
}));

const defaultProps = {
  id: 'reexport-moda;',
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
  order: { id: 'id' },
  source: REEXPORT_SOURCES.order,
};

const renderReexportModal = (props = {}) => render(
  <ReexportModal
    {...defaultProps}
    {...props}
  />,
);

describe('ReexportModal', () => {
  it('should render \'Re-export\' modal', () => {
    renderReexportModal();

    expect(screen.getByText(`ui-orders.reexport.${defaultProps.source}.confirmModal.message`)).toBeInTheDocument();
  });
});

describe('ReexportModal actions', () => {
  const mockReexport = {
    reExport: jest.fn(() => Promise.resolve()),
    isLoading: false,
  };

  beforeEach(() => {
    defaultProps.onCancel.mockClear();
    defaultProps.onConfirm.mockClear();
    mockReexport.reExport.mockClear();
    useReexport.mockClear().mockReturnValue(mockReexport);
  });

  it('should call \'onConfirm\' when \'Confirm\' button was clicked', async () => {
    renderReexportModal();

    await act(async () => user.click(screen.getByText('ui-orders.button.confirm')));

    expect(mockReexport.reExport).toHaveBeenCalled();
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('should catch reexport error', async () => {
    mockReexport.reExport.mockReturnValue(Promise.reject(new Error('Test')));

    renderReexportModal();

    await act(async () => user.click(screen.getByText('ui-orders.button.confirm')));

    expect(mockReexport.reExport).rejects.toBeDefined();
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('should call \'onCancel\' when \'Cancel\' button was clicked', async () => {
    renderReexportModal();

    await act(async () => user.click(screen.getByText('ui-orders.buttons.line.cancel')));

    expect(defaultProps.onCancel).toHaveBeenCalled();
  });
});

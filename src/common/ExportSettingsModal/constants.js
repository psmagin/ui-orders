export const EXPORT_ORDER_FIELDS = {
  poNumberPrefix: 'PO number prefix',
  poNumber: 'PO number',
  poNumberSuffix: 'PO number suffix',
  vendor: 'Vendor',
  organizationType: 'Organization type',
  orderType: 'Order type',
  acquisitionsUnits: 'Acquisitions units',
  approvalDate: 'Approval date',
  assignedTo: 'Assigned to',
  billTo: 'Bill to',
  shipTo: 'Ship to',
  manualPo: 'Manual',
  reEncumber: 'Re-encumber',
  createdByUserId: 'Created by',
  createdDate: 'Created on',
  note: 'Note',
  workflowStatus: 'Workflow status',
  approved: 'Approved',
  interval: 'Renewal interval',
  isSubscription: 'Subscription',
  manualRenewal: 'Manual renewal',
  ongoingNotes: 'Ongoing notes',
  reviewPeriod: 'Review period',
  renewalDate: 'Renewal date',
  reviewDate: 'Review date',
  poTags: 'PO tags',
};

export const EXPORT_LINE_FIELDS = {
  poLineNumber: 'POLine number',
  titleOrPackage: 'Title',
  instanceId: 'Instance UUID',
  subscriptionFrom: 'Subscription from',
  subscriptionTo: 'Subscription to',
  subscriptionInterval: 'Subscription interval',
  receivingNote: 'Receiving note',
  publisher: 'Publisher',
  edition: 'Edition',
  packagePoLineId: 'Linked package',
  contributor: 'Contributor, Contributor type',
  productIdentifier: 'Product ID, Qualifier, Product ID type',
  description: 'Internal note',
  acquisitionMethod: 'Acquisition method',
  orderFormat: 'Order format',
  createdDateLine: 'Created on (PO Line)',
  receiptDate: 'Receipt date',
  receiptStatus: 'Receipt status',
  paymentStatus: 'Payment status',
  source: 'Source',
  donor: 'Donor',
  selector: 'Selector',
  requester: 'Requester',
  cancellationRestriction: 'Cancellation restriction',
  cancellationRestrictionNote: 'Cancellation description',
  rush: 'Rush',
  collection: 'Collection',
  poLineDescription: 'Line description',
  refNumber: 'Vendor reference number, reference type',
  instructions: 'Instructions to vendor',
  vendorAccount: 'Account number',
  listUnitPrice: 'Physical unit price',
  quantityPhysical: 'Quantity physical',
  listUnitPriceElectronic: 'Electronic unit price',
  quantityElectronic: 'Quantity electronic',
  discount: 'Discount',
  poLineEstimatedPrice: 'Estimated price',
  currency: 'Currency',
  fundDistribution: 'Fund code, Expense class, Value, Amount',
  location: 'Location, Quantity P, Quantity E',
  materialSupplier: 'Material supplier',
  receiptDue: 'Receipt due',
  expectedReceiptDate: 'Expected receipt date',
  volumes: 'Volumes',
  createInventory: 'Create inventory',
  materialType: 'Material type',
  accessProvider: 'Access provider',
  activated: 'Activation status',
  activationDue: 'Activation due',
  createInventoryE: 'Create inventory E',
  materialTypeE: 'Material type E',
  trial: 'Trial',
  expectedActivation: 'Expected activation',
  userLimit: 'User limit',
  resourceUrl: 'URL',
  poLineTags: 'POLine tags',
  renewalNote: 'Renewal note',
};

export const EXPORT_ORDER_FIELDS_OPTIONS = Object.keys(EXPORT_ORDER_FIELDS).map(field => ({
  label: EXPORT_ORDER_FIELDS[field],
  value: field,
}));

export const EXPORT_LINE_FIELDS_OPTIONS = Object.keys(EXPORT_LINE_FIELDS).map(field => ({
  label: EXPORT_LINE_FIELDS[field],
  value: field,
}));

export const PRINT_ORDER_FIELDS = {};
export const PRINT_LINE_FIELDS = {};

export const PRINT_ORDER_FIELDS_OPTIONS = Object.entries(PRINT_ORDER_FIELDS).map(([value, label]) => ({
  label,
  value,
}));

export const PRINT_LINE_FIELDS_OPTIONS = Object.entries(PRINT_LINE_FIELDS).map(([value, label]) => ({
  label,
  value,
}));

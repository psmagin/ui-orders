export const ORDERS_API = 'orders/composite-orders';
export const ORDER_DETAIL_API = `${ORDERS_API}/:{id}`;
export const LINES_API = 'orders/order-lines';
export const LINE_DETAIL_API = `${LINES_API}/:{lineId}`;
export const CONFIG_API = 'configurations/entries';
export const ORDER_NUMBER_API = 'orders/po-number';
export const ORDER_NUMBER_VALIDATE_API = `${ORDER_NUMBER_API}/validate`;
export const VENDORS_API = 'organizations-storage/organizations';
export const RECEIVING_API = 'orders/receiving-history';
export const LOCATIONS_API = 'locations';
export const RECEIVE_API = 'orders/receive';
export const ITEMS_API = 'inventory/items';
export const CHECKIN_API = 'orders/check-in';
export const ORDER_PIECES_API = 'orders/pieces';
export const MATERIAL_TYPES_API = 'material-types';
export const FUND_API = 'finance-storage/funds';
export const USERS_API = 'users';
export const IDENTIFIER_TYPES_API = 'identifier-types';
export const CONTRIBUTOR_NAME_TYPES_API = 'contributor-name-types';

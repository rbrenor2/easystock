export enum LogAction {
    CREATE_PRODUCT="CREATE_PRODUCT",
    UPDATE_PRODUCT="UPDATE_PRODUCT",
    ADD_PRODUCTS="ADD_PRODUCTS",
  }
  
 export interface Log {
    action: string;
    userId: string;
    organizationId: string;
    product?: string;
    productNumber?: number;
    
  }
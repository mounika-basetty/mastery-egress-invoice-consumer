import {
    CostDetail,
    VendorInvoice,
    VendorVoucher
} from '@masterysystems/topic.accounting.vendor.voucher.v1/dist/value'

export type InboundVoucher = VendorVoucher
export type InboundCostLineItems = CostDetail
export type InboundVendorInvoices = VendorInvoice

export enum VoucherEventTypes {
    VoucherInserted = 'Insert',
    VoucherUpdated = 'Update',
    VoucherDeleted = 'Delete'
}

export interface EventTypeObjectKey {
    [key: string]: string
}

export const VoucherOutboundEventType: EventTypeObjectKey = {
    INSERT: 'VOUCHER_INSERTED',
    UPDATE: 'VOUCHER_UPDATED',
    DELETE: 'VOUCHER_DELETED'
}

export interface VoucherIdentifiers {
    carrierIdentifier: CarrierIdentifier
}

export type CarrierIdentifier = {
    carrierId: string | null
    carrierCode: string | null
}

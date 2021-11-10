import {format} from 'date-fns'

import {
    CostLineItem,
    MoneyRecord,
    OutboundVoucher,
    VendorInvoices
} from '../generated-types/voucher'
import {
    InboundCostLineItems,
    InboundVendorInvoices,
    InboundVoucher,
    VoucherIdentifiers,
    VoucherOutboundEventType
} from './types'

export const mapVoucherToOutboundVoucher = (
    voucher: InboundVoucher,
    identifiers: VoucherIdentifiers
): OutboundVoucher => {
    const {CurrencyId: currency} = voucher
    return {
        id: voucher.Id,
        eventType: VoucherOutboundEventType[voucher.EventType.toUpperCase()],
        statusTerm: voucher.StatusId,
        voucherDate: convertToDate(voucher.VoucherDate),
        dueDate: convertToDate(voucher.DueDate),
        vendorId: voucher.VendorId,
        voucherNumber: voucher.VoucherNumber,
        routeId: voucher.RouteId,
        routeNumber: getRouteNumber(voucher.VoucherLineItems),
        originalAmountDue: mapMoney(voucher.OriginalAmountDueDouble, currency),
        currentAmountDue: mapMoney(voucher.CurrentAmountDueDouble, currency),
        discountAmount: mapMoney(voucher.DiscountAmountDouble, currency),
        voucherMethodTerm: voucher.InvoiceDistributionMethodId,
        paymentTermsTerm: voucher.CarrierPaymentTermId,
        dueDateCalculation: voucher.DueDateCalculation,
        discountDateCalculation: voucher.DiscountDateCalculation,
        discountPercentage: voucher.DiscountPercentDouble,
        paymentMethodTerm: voucher.PaymentMethodId,
        isCreditMemoed: voucher.IsCreditMemoed,
        creditMemoInformation: voucher.VendorCreditMemo
            ? {
                  id: voucher.VendorCreditMemo.Id,
                  creditMemoDateTime: convertISOToUnixTime(
                      voucher.VendorCreditMemo.Date
                  ),
                  amount: mapMoney(
                      voucher.VendorCreditMemo.AmountDouble,
                      currency
                  ),
                  creditMemoNumber: voucher.VendorCreditMemo.Number,
                  createdBy: voucher.VendorCreditMemo.CreatedBy,
                  createdDateTime: convertISOToUnixTime(
                      voucher.VendorCreditMemo.CreatedOn
                  ),
                  lastUpdatedBy: voucher.VendorCreditMemo.UpdatedBy,
                  lastUpdatedDateTime: convertISOToUnixTime(
                      voucher.VendorCreditMemo.UpdatedOn
                  )
              }
            : null,
        createdBy: voucher.CreatedBy,
        createdDateTime: convertISOToUnixTime(voucher.CreatedOn),
        lastUpdatedBy: voucher.UpdatedBy,
        lastUpdatedDateTime: convertISOToUnixTime(voucher.UpdatedOn),
        batchInfo: voucher.BatchInfo
            ? {
                  id: voucher.BatchInfo.BatchId,
                  description: voucher.BatchInfo.BatchDescription,
                  statusTerm: voucher.BatchInfo.BatchStatusId,
                  isFailed: voucher.BatchInfo.IsFailedBatch,
                  parentBatchId: voucher.BatchInfo.ParentVoucherBatchId,
                  createdBy: voucher.BatchInfo.BatchCreatedBy,
                  createdDateTime: convertISOToUnixTime(
                      voucher.BatchInfo.BatchCreatedOn
                  ),
                  updatedBy: voucher.BatchInfo.BatchUpdatedBy,
                  updatedDateTime: convertISOToUnixTime(
                      voucher.BatchInfo.BatchUpdatedOn
                  )
              }
            : null,
        remittanceInformation: voucher.RemittanceInfo
            ? {
                  addressId: voucher.RemittanceInfo.RemitToAddressId,
                  carrierId: voucher.RemittanceInfo.CarrierId,
                  carrierCode: identifiers.carrierIdentifier.carrierCode,
                  email: voucher.RemittanceInfo.RemittanceEmail,
                  groupingTerm: voucher.RemittanceInfo.RemittanceGroupingId
              }
            : null,
        costLineItems: getCostLineItems(voucher.VoucherLineItems, currency),
        vendorInvoices: getVendorInvoices(voucher.VendorInvoices, currency)
    }
}

const getCostLineItems = (
    inboundCostLineItems: (InboundCostLineItems | null)[] | null,
    currencyCodeTerm: string | null
): CostLineItem[] | null => {
    const outboundCostLineItems: CostLineItem[] = []
    if (inboundCostLineItems) {
        inboundCostLineItems.forEach(item => {
            if (item) {
                outboundCostLineItems.push({
                    id: item.Id,
                    costTypeTerm: item.ChargeTypeId,
                    costPerUnit: mapMoney(
                        item.CostPerUnitDouble,
                        currencyCodeTerm
                    ),
                    units: item.UnitsDouble,
                    totalCost: mapMoney(item.TotalCostDouble, currencyCodeTerm),
                    statusTerm: item.StatusId,
                    isCredit: item.IsCredit,
                    routeVendorTypeTerm: item.RouteVendorTypeId,
                    createdBy: item.CreatedBy,
                    createdDateTime: convertISOToUnixTime(item.CreatedOn),
                    lastUpdatedBy: item.UpdatedBy,
                    lastUpdatedDateTime: convertISOToUnixTime(item.UpdatedOn)
                })
            }
        })
    }
    return outboundCostLineItems
}

const getVendorInvoices = (
    inboundVendorInvoices: (InboundVendorInvoices | null)[] | null,
    currencyCodeTerm: string | null
): VendorInvoices[] | null => {
    const outboundVendorInvoices: VendorInvoices[] = []
    if (inboundVendorInvoices) {
        inboundVendorInvoices.forEach(vendorInvoice => {
            if (vendorInvoice) {
                outboundVendorInvoices.push({
                    id: vendorInvoice.Id,
                    vendorInvoiceNumber: vendorInvoice.VendorInvoiceNumber,
                    invoiceDate: convertToDate(vendorInvoice.InvoiceDate),
                    amount: mapMoney(
                        vendorInvoice.AmountDouble,
                        currencyCodeTerm
                    ),
                    statusTerm: vendorInvoice.StatusId,
                    approvalDate: convertToDate(vendorInvoice.ApprovalDate),
                    isQuickpay: vendorInvoice.IsQuickpay,
                    comments: vendorInvoice.Comments,
                    approverEmailAddress: vendorInvoice.Approver,
                    createdBy: vendorInvoice.CreatedBy,
                    createdDateTime: convertISOToUnixTime(
                        vendorInvoice.CreatedOn
                    ),
                    lastUpdatedBy: vendorInvoice.UpdatedBy,
                    lastUpdatedDateTime: convertISOToUnixTime(
                        vendorInvoice.UpdatedOn
                    ),
                    receivedDateTime: convertISOToUnixTime(
                        vendorInvoice.DateReceived
                    )
                })
            }
        })
    }
    return outboundVendorInvoices
}

const convertISOToUnixTime = (dateTime: string | null): number | null => {
    return dateTime ? new Date(dateTime).getTime() : null
}

const convertToDate = (date: string | null): string | null => {
    return date ? format(new Date(date), 'yyyy-MM-dd') : null
}

const getRouteNumber = (
    inboundCostLineItems: (InboundCostLineItems | null)[] | null
): string | null => {
    if (inboundCostLineItems && inboundCostLineItems[0]?.RouteCode) {
        return inboundCostLineItems[0]?.RouteCode
    }
    return null
}

const mapMoney = (
    amount: number | null,
    currency: string | null
): MoneyRecord | null => {
    if (amount && currency) {
        return {
            amount: amount,
            currencyCodeTerm: currency
        }
    }
    return null
}

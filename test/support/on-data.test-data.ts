import {Message} from 'node-rdkafka'
import {types} from '@masterysystems/lachesis-kafka-client'

import {
    Key as VoucherKey,
    Value as VoucherValue
} from '@masterysystems/topic.accounting.vendor.voucher.v1/dist'

export const message: Message = {
    value: null,
    size: 1,
    topic: 'test-topic',
    offset: 1,
    partition: 1
}

export const validVoucherData: types.Decoded<VoucherKey, VoucherValue> = {
    key: {
        LoadId: 'test-load',
        VendorId: 'test-vendor',
        RouteId: 'test-route'
    },
    value: {
        EventType: 'Insert',
        Id: '88ba1580-9890-4d90-a0e9-70667381428a',
        InvoiceDistributionMethodId: null,
        IsCreditMemoed: false,
        IsSettled: false,
        LoadId: 'f788177c-c518-43a0-8202-9f899098ac26',
        OriginalAmountDue: null,
        OriginalAmountDueDouble: 10,
        PaymentMethodId: 'test-payment',
        RemittanceInfo: {
            RemittanceEmail: 'abc@gmail.com',
            RemittanceGroupingId: 'groupId',
            RemitToAddressId: 'addressId',
            CarrierId: '0693cd65-cd76-4349-934d-54926e812c02'
        },
        RouteId: 'f788177c-c518-43a0-8202-9f899098ac26',
        StatusId: 'Saved',
        UpdatedBy: 'updated-by-test-id',
        UpdatedOn: '2021-03-30T10:09:38.141Z',
        VendorCreditMemo: {
            Id: '7ae99db9-7f86-4007-8f92-c4fc84f2eb16',
            Amount: null,
            AmountDouble: 10,
            CreatedBy: 'created-by-test-id',
            CreatedOn: '122323243434343434',
            Date: '2021-03-30T10:09:38.141Z',
            IsProcessed: true,
            Number: '1223',
            UpdatedBy: 'updated-by-test-id',
            UpdatedOn: '2021-03-30T10:09:38.141Z'
        },
        VendorId: '0693cd65-cd76-4349-934d-54926e812c02',
        VendorInvoices: [
            {
                Id: 'test',
                Amount: null,
                AmountDouble: 10,
                ApprovalDate: '2021-03-30T10:09:38.141Z',
                Approver: 'test',
                Comments: 'test',
                CreatedBy: 'created-by-test-id',
                CreatedOn: '2021-03-30T10:09:38.141Z',
                Currency: 'USD',
                DateReceived: '2021-03-30T10:09:38.141Z',
                DateToPay: '2021-03-30T10:09:38.141Z',
                InvoiceDate: '2021-03-30T10:09:38.141Z',
                IsQuickpay: true,
                LoadId: 'f788177c-c518-43a0-8202-9f899098ac26',
                Processor: null,
                RouteId: 'f788177c-c518-43a0-8202-9f899098ac26',
                StatusId: 'created',
                UpdatedBy: null,
                UpdatedOn: null,
                VendorId: '0693cd65-cd76-4349-934d-54926e812c02',
                VendorInvoiceNumber: '1223',
                ExternalId: null
            }
        ],
        VoucherDate: '2021-03-30T10:09:38.141Z',
        VoucherLineItems: [
            {
                AdvanceEid: null,
                ChargeTypeId: 'Flat Rate',
                CostPerUnit: null,
                CostPerUnitDouble: 200,
                CreatedBy: 'dadd3bb7-4da7-4df7-b254-0019b164783e',
                CreatedOn: '2021-04-14T16:45:09.1993890',
                Id: '2c37fe60-5034-4f6b-878c-10461eee012d',
                IsCredit: false,
                LoadId: '68dbab48-93e6-43f0-9134-46847aacfb27',
                RouteCode: '1000098318',
                RouteId: 'dcf4fd3a-ac77-43ty-b6cf-ad7992ff2679',
                RouteVendorTypeId: 'Carrier',
                StatusId: 'CreditMemoed',
                TotalCost: null,
                TotalCostDouble: 200,
                Units: null,
                UnitsDouble: 1,
                UpdatedBy: 'dadd3bb7-4da7-4dt7-b254-0019b1648e65',
                UpdatedOn: '2021-05-19T22:01:11.0586230',
                VendorGlCode: '513000',
                VendorId: '01278e63-bbcf-46c5-8347-c0d2d4f4cfa2',
                VoucherHeaderEid: 4153
            }
        ],
        VoucherNumber: '32323',
        VoucherRootNumber: '454553',
        BatchInfo: {
            BatchId: 'batch',
            BatchCreatedBy: 'created-by-test-id',
            BatchCreatedOn: '2021-03-30T10:09:38.141Z',
            BatchDescription: 'test batch',
            BatchStatusId: 'pending',
            BatchUpdatedBy: null,
            BatchUpdatedOn: '2021-03-30T10:09:38.141Z',
            IsFailedBatch: false,
            ParentVoucherBatchId: null
        },
        CarrierPaymentTermId: 'test-payment-Id',
        CreatedBy: 'created-by-test-id',
        CreatedOn: '232323232',
        CurrencyId: 'test-currency-id',
        CurrentAmountDue: null,
        CurrentAmountDueDouble: 10,
        DateSettled: null,
        DiscountAmount: null,
        DiscountAmountDouble: 10,
        DiscountDateCalculation: null,
        DiscountPercent: null,
        DiscountPercentDouble: 10,
        DueDate: '2021-03-30T10:09:38.141Z',
        DueDateCalculation: null
    }
}

export const invalidEventTypeData: types.Decoded<VoucherKey, VoucherValue> = {
    key: {
        LoadId: 'test-load',
        VendorId: 'test-vendor',
        RouteId: 'test-route'
    },
    value: {
        EventType: 'VOUCHER_INSERTED_FAIL',
        Id: '88ba1580-9890-4d90-a0e9-70667381428a',
        InvoiceDistributionMethodId: null,
        IsCreditMemoed: false,
        IsSettled: false,
        LoadId: 'f788177c-c518-43a0-8202-9f899098ac26',
        OriginalAmountDue: null,
        OriginalAmountDueDouble: 10,
        PaymentMethodId: 'test-payment',
        RemittanceInfo: {
            RemittanceEmail: 'abc@gmail.com',
            RemittanceGroupingId: 'groupId',
            RemitToAddressId: 'addressId',
            CarrierId: '0693cd65-cd76-4349-934d-54926e812c02'
        },
        RouteId: 'f788177c-c518-43a0-8202-9f899098ac26',
        StatusId: 'Saved',
        UpdatedBy: 'updated-by-test-id',
        UpdatedOn: '2021-03-30T10:09:38.141Z',
        VendorCreditMemo: {
            Id: '7ae99db9-7f86-4007-8f92-c4fc84f2eb16',
            Amount: null,
            AmountDouble: 10,
            CreatedBy: 'created-by-test-id',
            CreatedOn: '122323243434343434',
            Date: '2021-03-30T10:09:38.141Z',
            IsProcessed: true,
            Number: '1223',
            UpdatedBy: 'updated-by-test-id',
            UpdatedOn: '2021-03-30T10:09:38.141Z'
        },
        VendorId: '0693cd65-cd76-4349-934d-54926e812c02',
        VendorInvoices: [
            {
                Id: 'test',
                Amount: null,
                AmountDouble: 10,
                ApprovalDate: '2021-03-30T10:09:38.141Z',
                Approver: 'test',
                Comments: 'test',
                CreatedBy: 'created-by-test-id',
                CreatedOn: '2021-03-30T10:09:38.141Z',
                Currency: 'USD',
                DateReceived: '2021-03-30T10:09:38.141Z',
                DateToPay: '2021-03-30T10:09:38.141Z',
                InvoiceDate: '2021-03-30T10:09:38.141Z',
                IsQuickpay: true,
                LoadId: 'f788177c-c518-43a0-8202-9f899098ac26',
                Processor: null,
                RouteId: 'f788177c-c518-43a0-8202-9f899098ac26',
                StatusId: 'created',
                UpdatedBy: null,
                UpdatedOn: null,
                VendorId: '0693cd65-cd76-4349-934d-54926e812c02',
                VendorInvoiceNumber: '1223',
                ExternalId: null
            }
        ],
        VoucherDate: '2021-03-30T10:09:38.141Z',
        VoucherLineItems: [
            {
                AdvanceEid: null,
                ChargeTypeId: 'Flat Rate',
                CostPerUnit: null,
                CostPerUnitDouble: 200,
                CreatedBy: 'dadd3bb7-4da7-4df7-b254-0019b164783e',
                CreatedOn: '2021-04-14T16:45:09.1993890',
                Id: '2c37fe60-5034-4f6b-878c-10461eee012d',
                IsCredit: false,
                LoadId: '68dbab48-93e6-43f0-9134-46847aacfb27',
                RouteCode: '1000098318',
                RouteId: 'dcf4fd3a-ac77-43ty-b6cf-ad7992ff2679',
                RouteVendorTypeId: 'Carrier',
                StatusId: 'CreditMemoed',
                TotalCost: null,
                TotalCostDouble: 200,
                Units: null,
                UnitsDouble: 1,
                UpdatedBy: 'dadd3bb7-4da7-4dt7-b254-0019b1648e65',
                UpdatedOn: '2021-05-19T22:01:11.0586230',
                VendorGlCode: '513000',
                VendorId: '01278e63-bbcf-46c5-8347-c0d2d4f4cfa2',
                VoucherHeaderEid: 4153
            }
        ],
        VoucherNumber: '32323',
        VoucherRootNumber: '454553',
        BatchInfo: {
            BatchId: 'batch',
            BatchCreatedBy: 'created-by-test-id',
            BatchCreatedOn: '2021-03-30T10:09:38.141Z',
            BatchDescription: 'test batch',
            BatchStatusId: 'pending',
            BatchUpdatedBy: null,
            BatchUpdatedOn: '2021-03-30T10:09:38.141Z',
            IsFailedBatch: false,
            ParentVoucherBatchId: null
        },
        CarrierPaymentTermId: 'test-payment-Id',
        CreatedBy: 'created-by-test-id',
        CreatedOn: '232323232',
        CurrencyId: 'test-currency-id',
        CurrentAmountDue: null,
        CurrentAmountDueDouble: 10,
        DateSettled: null,
        DiscountAmount: null,
        DiscountAmountDouble: 10,
        DiscountDateCalculation: null,
        DiscountPercent: null,
        DiscountPercentDouble: 10,
        DueDate: '2021-03-30T10:09:38.141Z',
        DueDateCalculation: null
    }
}

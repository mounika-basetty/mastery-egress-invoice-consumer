import {OutboundVoucher} from '../../src/generated-types/voucher'

export const expectedOutboundVoucher: OutboundVoucher = {
    batchInfo: {
        id: 'testId',
        description: 'testDescription',
        statusTerm: 'status',
        isFailed: false,
        parentBatchId: 'testBatch',
        createdBy: 'testCreatedBy',
        createdDateTime: 123456565,
        updatedBy: 'testUpdatedBy',
        updatedDateTime: 123456565
    },
    costLineItems: null,
    creditMemoInformation: {
        id: 'testId',
        creditMemoDateTime: 34345454,
        amount: null,
        creditMemoNumber: 'memo',
        createdBy: 'testCreatedBy',
        createdDateTime: 34765485748,
        lastUpdatedBy: 'testUpdatedBy',
        lastUpdatedDateTime: 466767676767
    },
    createdBy: 'testCreatedBy',
    createdDateTime: null,
    currentAmountDue: null,
    discountDateCalculation: 100,
    discountPercentage: 100,
    discountAmount: null,
    dueDate: 'testDate',
    dueDateCalculation: 100,
    eventType: 'testEventType',
    id: 'testId',
    isCreditMemoed: false,
    lastUpdatedBy: 'testLastUpdatedBy',
    lastUpdatedDateTime: null,
    originalAmountDue: null,
    paymentTermsTerm: 'testPaymentTermsTerm',
    paymentMethodTerm: 'testPaymentMethodTerm',
    remittanceInformation: {
        addressId: 'testAddress',
        carrierId: 'testCarrier',
        carrierCode: 'TEST', // TODO:  gql call
        email: 'abc@gmail.com',
        groupingTerm: 'testGroup'
    },
    routeId: 'testRouteId',
    routeNumber: 'testRouteNumber',
    statusTerm: 'testStatusTerm',
    voucherDate: 'testVoucherDate',
    vendorId: 'testVendorId',
    voucherNumber: 'testVoucherNumber',
    voucherMethodTerm: 'testVoucherMethodTerm',
    vendorInvoices: null
}

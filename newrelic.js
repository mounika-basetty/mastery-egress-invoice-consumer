'use strict'
/**
 * New Relic agent configuration for local dev.
 */
exports.config = {
    app_name: ['Mastery Egress Voucher Consumer'],
    /*
     * Disable when running locally
     */
    agent_enabled: true,
    logging: {
        enabled: false
      }
    
}

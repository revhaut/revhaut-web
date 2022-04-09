const emailConfig = {
    sendGrid: {
        baseEndpoint: 'https://api.sendgrid.com/v3/',
        sendEmail: 'mail/send',
        apiKey: process.env.SENDGRID_KEY,
        sender: process.env.SENDGRID_EMAIL_SENDER,
        templates: {
            companyRegistrationVerification: process.env.COMPANY_REGISTRATION_VERIFICATION_EMAIL_TEMPLATE,
            companyVerificationSuccessful: process.env.COMPANY_VERIFICATION_SUCCESSFUL_EMAIL_TEMPLATE,
            accountRegistration: process.env.REGISTRATION_EMAIL_TEMPLATE,
            accountPasswordReset: process.env.PASSWORD_RESET_EMAIL_TEMPLATE,
            accountPasswordResetSuccessful: process.env.PASSWORD_RESET_SUCCESSFUL_EMAIL_TEMPLATE,
        },
    },
    outlook: {
        senderEmail: process.env.SENDER_EMAIL,
        templates: {
            companyRegistrationVerification: process.env.COMPANY_REGISTRATION_VERIFICATION_EMAIL_TEMPLATE,
            companyVerificationSuccessful: process.env.COMPANY_VERIFICATION_SUCCESSFUL_EMAIL_TEMPLATE,
            accountRegistration: process.env.REGISTRATION_EMAIL_TEMPLATE,
            accountPasswordReset: process.env.PASSWORD_RESET_EMAIL_TEMPLATE,
            accountPasswordResetSuccessful: process.env.PASSWORD_RESET_SUCCESSFUL_EMAIL_TEMPLATE,
            visitRequestApproval: process.env.VISIT_REQUEST_APPROVAL_EMAIL_TEMPLATE,
            visitInvitation: process.env.VISIT_INVITATION_EMAIL_TEMPLATE,
            visitRejection: process.env.VISIT_REJECT_EMAIL_TEMPLATE,
            visitRequestDeclined: process.env.VISIT_REQUEST_DECLINED_EMAIL_TEMPLATE,
            visitReschedule: process.env.VISIT_RESCEDULE_EMAIL_TEMPLATE,
            visitCancelled: process.env.VISIT_CANCELLED_EMAIL_TEMPLATE,
            twoFaToken: process.env.TWO_FA_VERIFICATION_EMAIL_TEMPLATE,
            walkinRequest: process.env.WALKIN_REQUEST_EMAIL_TEMPLATE,
            visitorVisitRequest: process.env.VISITOR_VISIT_REQUEST_EMAIL_TEMPLATE,
        },
    },
    postmark: {
        senderEmail: process.env.POSTMARK_EMAIL_SENDER,
        templates: {
            registrationVerification: 'account-verification',
        },
    },
};

module.exports = emailConfig;
export const REFERRAL_CONSTANTS = {
  REFERRER_DOWNLOADS: 3,
  REFEREE_DOWNLOADS: 1,

  MODAL_TITLE: 'Refer & Earn Downloads',
  MODAL_DESCRIPTION: 'Invite your friends to Pika Resume. When they sign up, you get 3 free downloads.',

  STEPS: {
    SEND: {
      title: 'Send Invitation',
      description: 'Share your referral link with friends and invite them to try Pika Resume.',
      icon: '/images/chat.svg',
      threadImage: 'single' as const,
    },
    REGISTER: {
      title: 'Registration',
      description: 'They sign up using your referral link.',
      icon: '/images/app_registration.svg',
      threadImage: 'both' as const,
    },
    EARN: {
      title: 'Earn Downloads',
      description: 'You get 3 free downloads, and your friend gets 1 free download.',
      icon: '/images/earn-downloads.svg',
      threadImage: 'both' as const,
    },
  },

  SHARE_TITLE: 'Share the referral link',
  SHARE_DESCRIPTION:
    'You can also share the referral link by copying and sending it or sharing it on your social media.',

  COPY_BUTTON_TEXT: 'Copy Link',
  COPIED_BUTTON_TEXT: 'Copied!',

  DEFAULT_REFERRAL_LINK: 'pikaresume/referral-2558788',
} as const;

// Helper to get steps as an array for carousel
export const REFERRAL_STEPS = [
  REFERRAL_CONSTANTS.STEPS.SEND,
  REFERRAL_CONSTANTS.STEPS.REGISTER,
  REFERRAL_CONSTANTS.STEPS.EARN,
] as const;

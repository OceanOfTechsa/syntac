import { Flag, flag } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';

const SHOW_ANNOUNCEMENT_BANNER: Flag<boolean, any> = flag({
    key: 'ShowAnnouncementBanner',
    adapter: vercelAdapter(),
});


const AnnouncementBANNER_TEXT: Flag<string, any> = flag({
    key: 'AnnouncementBannerText',
    adapter: vercelAdapter(),
});

const AnnouncementBANNER_URL: Flag<string, any> = flag({
    key: 'AnnouncementBannerUrl',
    adapter: vercelAdapter(),
});

const AnnouncementBANNER_BUTTON_TEXT: Flag<string, any> = flag({
    key: 'AnnouncementBannerButtonText',
    adapter: vercelAdapter(),
});

// Registries: the key here is the name you pass to FlagSettings.
// Add new flags to the registry matching their type.
export const BOOLEAN_FLAGS = {
    ShowAnnouncementBanner: SHOW_ANNOUNCEMENT_BANNER,
} satisfies Record<string, Flag<boolean, any>>;

export const STRING_FLAGS = {
    AnnouncementBannerText: AnnouncementBANNER_TEXT,
    AnnouncementBannerUrl: AnnouncementBANNER_URL,
    AnnouncementBannerButtonText: AnnouncementBANNER_BUTTON_TEXT,
} satisfies Record<string, Flag<string, any>>;

export const NUMBER_FLAGS = {} satisfies Record<string, Flag<number, any>>;



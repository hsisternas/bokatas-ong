export interface VolunteerApplication {
  name: string;
  email: string;
  phone: string;
  venue: string;
  area: string;
  availability: string;
  message: string;
  acceptedPrivacy: boolean;
}

export type VolunteerApplicationResult =
  | { status: 'not-configured' }
  | { status: 'sent' };

/**
 * The public Bokatas page currently renders an Elementor template without a
 * browser-accessible form action or CORS-supported API. Keep this boundary
 * explicit: no personal data is sent until Bokatas provides a supported
 * endpoint or a server-side integration for this application.
 */
export const submitVolunteerApplication = async (_application: VolunteerApplication): Promise<VolunteerApplicationResult> => {
  return { status: 'not-configured' };
};

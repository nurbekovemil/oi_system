import * as https from 'https';

/** Temporary: set EDS_TLS_INSECURE=true if cdsapi.srs.kg has broken cert chain */
export const cdsHttpsAgent =
  process.env.EDS_TLS_INSECURE === 'true'
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

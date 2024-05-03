/**
 *
 * Asynchronously loads the component for VisualizePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

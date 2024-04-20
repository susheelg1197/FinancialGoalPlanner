import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the visualizePage state domain
 */

const selectVisualizePageDomain = state => state.visualizePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VisualizePage
 */

const makeSelectVisualizePage = () =>
  createSelector(
    selectVisualizePageDomain,
    substate => substate,
  );

export default makeSelectVisualizePage;
export { selectVisualizePageDomain };

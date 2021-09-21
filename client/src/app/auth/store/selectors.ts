import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/app-state.interface';
import {AuthStateInterface} from '../types/authState.interface';

export const authFeatureSelector = createFeatureSelector<
  AppStateInterface, AuthStateInterface
  >('auth')

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.validationErrors
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.isLoggedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.isLoggedIn === false
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.currentUser
)

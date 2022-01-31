import {AppStateInterface} from '../../shared/types/app-state.interface';
import {createSelector} from '@ngrx/store';
import {SettingsStateInterface} from '../types/settings-state.interface';

export const settingsFeatureSelector =
  (state: AppStateInterface): SettingsStateInterface => state.auth

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState) => settingsState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState) => settingsState.validationErrors
)

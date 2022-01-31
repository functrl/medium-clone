import {createSelector} from '@ngrx/store'
import {AppStateInterface} from '../../../types/app-state.interface'
import {PopularTagsStateInterface} from '../types/popular-tags-state.interface'

export const popularTagsFeatureSelector =
  (state: AppStateInterface): PopularTagsStateInterface => state.popularTags

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.data
)

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.isLoading
)

export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
)

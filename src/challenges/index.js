import * as apiTable from './01-api-table.jsx'
import * as filtering from './02-filtering.jsx'
import * as sortPaginate from './03-sort-paginate.jsx'
import * as formValidation from './04-form-validation.jsx'
import * as todoCrud from './05-todo-crud.jsx'
import * as debouncedSearch from './06-debounced-search.jsx'
import * as usereducerCart from './07-usereducer-cart.jsx'
import * as usecontextTheme from './08-usecontext-theme.jsx'
import * as optimisticUpdate from './09-optimistic-update.jsx'
import * as modalPortal from './10-modal-portal.jsx'

// Each challenge module exports: meta, Component (the task), Solution (reference)
export const challenges = [
  apiTable,
  filtering,
  sortPaginate,
  formValidation,
  todoCrud,
  debouncedSearch,
  usereducerCart,
  usecontextTheme,
  optimisticUpdate,
  modalPortal,
].map((mod) => ({ ...mod.meta, Component: mod.Component, Solution: mod.Solution }))

export const DIFFICULTIES = ['easy', 'medium', 'hard']

export function getChallenge(id) {
  return challenges.find((c) => c.id === id)
}

import type { SWRConfiguration } from 'swr'

import useSWR from 'swr'

import callApi from '@core/call-api'
import { getEndpoint } from '@core/utils'

export const getKey = (endpoint: string, query?: any) => (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null

  return getEndpoint(endpoint, { ...query, perPage: query?.perPage || 10, page: pageIndex + 1 })
}

const swr = (endpoint: string, options?: SWRConfiguration, fetcher = callApi) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, mutate, ...props } = useSWR(endpoint, endpoint?.includes('undefined') ? null : fetcher, {
    ...options
  })

  return {
    data: data,
    pagination: data?.pagination,
    loading: !error && !data,
    isError: error,
    mutate,
    ...props
  }
}

export default swr

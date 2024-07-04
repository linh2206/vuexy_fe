import swr from '@core/swr'
import { getEndpoint } from '@core/utils'

export const Profile = (queries?: any) => swr(getEndpoint('/profile', queries))

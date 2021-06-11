import api from '../apiService'
import config from '../../config/apiConfig'
import axios from 'axios'

jest.mock('axios')

const cities = [{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }]

describe('Test API Service', () => {
  it('Success fetch cities', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: cities }))
    await expect(api.cities()).resolves.toEqual(cities)
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`)
  })

  it('Fetch cities failure', async () => {
    const errMsg = 'Api Error'
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))
    await expect(api.cities()).rejects.toThrow(errMsg)
  })
})
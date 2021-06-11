import locationsInstance, { Locations } from '../locations'
import { formatDate } from '../../helpers/date'
import api, { Api } from '../../services/apiService'

const countries = [{ code: 'UKR', name: 'Ukraine' }]
const cities = [{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }]
const airlines = [{ country_code: 'UKR', name: 'Airlines', code: 'AVIA' }]

jest.mock('../../services/apiService', () => {
  const mockApi = {
    countries: jest.fn(() => Promise.resolve([{ code: 'UKR', name: 'Ukraine' }])),
    cities: jest.fn(() => Promise.resolve([{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }])),
    airlines: jest.fn(() => Promise.resolve([{ country_code: 'UKR', name: 'Airlines', code: 'AVIA' }])),
  }

  return {
    Api: jest.fn(() => mockApi)
  }
})

const apiService = new Api()

describe('Locations store tests', () => {
  beforeEach(() => {
    locationsInstance.countries = locationsInstance.serializeCountries(countries)
    locationsInstance.cities = locationsInstance.serializeCities(cities)
  })

  it('Check that locationInstance is instance of Locations class', () => {
    expect(locationsInstance).toBeInstanceOf(Locations)
  })

  it('Success Locations instance create', () => {
    const instance = new Locations(api, { formatDate })
    expect(instance.countries).toBe(null)
    expect(instance.shortCities).toEqual({})
    expect(instance.formatDate).toEqual(formatDate)
  })

  it('Check correct countries serialize', () => {
    const res = locationsInstance.serializeCountries(countries)
    const expectedData = {
      UKR: { code: 'UKR', name: 'Ukraine' }
    }

    expect(res).toEqual(expectedData)
  })

  it('Check countries serialize with incorrect data', () => {
    const res = locationsInstance.serializeCountries(null)
    const expectedData = {}

    expect(res).toEqual(expectedData)
  })

  it('Check correct cities serialize', () => {
    const res = locationsInstance.serializeCities(cities)
    const expectedData = {
      KH: {  country_code: 'UKR', name: 'Kharkiv', code: 'KH', country_name: 'Ukraine', full_name: 'Kharkiv, Ukraine' }
    }

    expect(res).toEqual(expectedData)
  })

  it('Check correct get city name by code', () => {
    const res = locationsInstance.getCityNameByCode('KH')
    expect(res).toBe('Kharkiv')
  })

  it('Check correct init method call', () => {
    const instance = new Locations(apiService, { formatDate })
    expect(instance.init()).resolves.toEqual([countries, cities, airlines])
  })
})
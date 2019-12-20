import { createSelector } from '../src'

interface IItem {
  name: string
  isActive?: boolean
  price?: number
}

interface IData {
  items: IItem[]
}

describe('createSelector', () => {
  it('should create selector', () => {
    const firstElementSelector = createSelector(0)
    expect(typeof firstElementSelector).toEqual('function')
    expect(firstElementSelector([])).toBeUndefined()
    expect(firstElementSelector<string[]>([])).toBeUndefined()
  })

  it('should get arg with unsupported argument', () => {
    const firstElementSelector = createSelector(true)
    expect(firstElementSelector([])).toEqual([])
  })

  it('should get nothing', () => {
    const firstElementSelector = createSelector(0)
    expect(firstElementSelector([])).toBeUndefined()
    expect(firstElementSelector<string[]>([])).toBeUndefined()
  })

  it('should select first element', () => {
    const firstElementSelector = createSelector(0)
    expect(firstElementSelector(["It's me"])).toMatchSnapshot()
    expect(
      firstElementSelector<string[]>(["It's me"])
    ).toMatchSnapshot()
  })

  it('should select first item price', () => {
    const data: IData = {
      items: [
        {
          name: 'Sofa',
          price: 100,
        },
      ],
    }
    const firstElementPriceSelector = createSelector(
      'items',
      0,
      (item: IItem) => item.price
    )
    expect(firstElementPriceSelector(data)).toMatchSnapshot()
  })

  it('should select first active item', () => {
    const data: IData = {
      items: [
        {
          name: 'Television',
          isActive: false,
        },
        {
          name: 'Sofa',
          isActive: true,
        },
        {
          name: 'Door',
          isActive: true,
        },
      ],
    }
    const firstActiveElementSelector = createSelector(
      'items',
      (items: IItem[]) => items.find((item: IItem) => item.isActive)
    )
    expect(firstActiveElementSelector(data)).toMatchSnapshot()
  })
})

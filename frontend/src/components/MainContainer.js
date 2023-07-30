import AllergenList from './AllergenList.js'
import CenterColumn from './PizzaTypeColumn.js'
import RighColumn from './RightColumn.js'

export const MainContainer = () => {
  return (
    <div className="main-container">
      <AllergenList />
      <CenterColumn />
      <RighColumn />
    </div>
  )
}

export default MainContainer
import LeftColumn from './LeftColumn.js'
import CenterColumn from './CenterColumn.js'
import RighColumn from './RightColumn.js'

export const MainContainer = () => {
  return (
      <div className="main-container">
          <LeftColumn />
          <CenterColumn />
          <RighColumn/>
      </div>
  )
}

export default MainContainer
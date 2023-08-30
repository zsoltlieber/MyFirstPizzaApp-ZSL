import SearchBar from "../searchBarComponents/SearchBar"

export const AboutUs = ({ setSearchText }) => {
//searchbar - test for my purpose
    return (
        <div id="about-us">
            <SearchBar setSearchTextChange={setSearchText} />  
            <h2 style={{ textAlign: "center" }}>ABOUT US</h2>
            <h3>Family, Fresh, Fast</h3>
            <p>
                Your top destination for great flavor and great food since 1990, MY BEST PIZZA Co. has embodied the vision
                of the family restaurant for decades. Our secret recipe—and our not-so-secret sense of fun and
                adventure—has touched so many lives since we opened. We welcome you to become a part of our rich
                history that’s still in the making.
            </p>

            <h3>Fresh, Wholesome Ingredients</h3>

            <p>
                As we continue to bring you our customer satisfaction and fresh, wholesome ingredients,
                we pride ourselves on our special ingredients made just for us!
                This includes fresh ground pepperoni, pure pork, specially made sausage, and our special blend cheese.
                Wherever you travel and see our MY BEST PIZZA Co. logo, you can rest assured knowing you will experience
                that same great “secret recipe” taste and value you have come to trust and love.
            </p>
        </div>
    )
}

export default AboutUs
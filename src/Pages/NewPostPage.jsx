import Navbar from "../components/Navbar/Navbar.jsx";

import AddImage from "../components/Newpost/Addimage/Addimage.jsx";
import AddTitle from "../components/Newpost/Addtitle/Addtitle.jsx";
import AddTag from "../components/Newpost/Addtag/Addtag.jsx";
import Tags from "../components/Newpost/Addtag/Tags.jsx";

const NewPostPage = () => {
    return (
        <div>
        <Navbar />
        <h1>New Post</h1>
        <AddImage />
        <AddTitle placeholder={'Title'}/>
        <AddTitle placeholder={'Titolo'}/>
        <Tags />
        </div>
    );
}

export default NewPostPage;
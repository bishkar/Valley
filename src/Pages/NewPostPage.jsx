import Navbar from "../components/Navbar/Navbar.jsx";

import AddImage from "../components/Newpost/Addimage/Addimage.jsx";
import AddTitle from "../components/Newpost/Addtitle/Addtitle.jsx";
import Tags from "../components/Newpost/Addtag/Tags.jsx";
import AddLink from "../components/Newpost/Addlink/Addlink.jsx";
import AddContent from "../components/Newpost/Addcontent/Addcontent.jsx";

const NewPostPage = () => {
    return (
        <div>
        <Navbar />
        <h1>New Post</h1>
        <AddImage />
        <AddTitle placeholder={'Title'}/>
        <AddTitle placeholder={'Titolo'}/>
        <Tags />
        <AddLink />
        <AddContent />
        </div>
    );
}

export default NewPostPage;
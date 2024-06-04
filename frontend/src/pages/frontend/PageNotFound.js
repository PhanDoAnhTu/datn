// components
import DocumentTitle from '../../components/frontend/DocumentTitle';
import Error from '../../components/frontend/Error';

const PageNotFound = () => {
    return (
        <>
            <DocumentTitle title="Trang 404"/>
            <Error/>
        </>
    )
}

export default PageNotFound
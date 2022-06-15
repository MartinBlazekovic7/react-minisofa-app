import {GetServerSideProps} from "next";
import fetcher from "../../../util/fetch";
import {API_BASENAME} from "../../../util/ApiName";
import {CategoryInfo} from "../../../model/Category";
import Categories from "../../../modules/Categories";

interface SportPageInterface {
    details: CategoryInfo;
}


export default function SportPage(props: SportPageInterface) {

    const {details} = props
    console.log(details);
    return <><Categories categories={details.categories}/></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, res } = context;

    try {
        //@ts-ignore
        const { sport, date } = params;

        const details = await fetcher(API_BASENAME + `sport/${sport}/${date}/7200/categories`)

        const props: SportPageInterface = {details: details || []}
        return {
            props: props,
        };

    } catch (error) {
        res.statusCode = 404;
        return { props: { error } };
    }
};
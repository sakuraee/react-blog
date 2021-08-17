import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PageTitle from '../../components/Blog/Content/PageTitle';
import { Pagination } from 'antd';
import { articlesPageSize } from '../../utils/constant';

import './index.css';

const ArtClass = props => {
    const [curPage, setCurPage] = useState(1);
    const turnToArticle = title => {
        props.history.push(`/post?title=${title}`);
    };

    const [myClass, setMyClass] = useState('');
    useEffect(() => {
        setMyClass(decodeURI(props.location.search.split('?class=')[1]));
    }, [props]);

    return (
        <>
            <PageTitle title={myClass} />
            <div className="standard-page-box animated bounceInLeft">
                {props.articles
                    .filter(item => item.classes === myClass)
                    .slice((curPage - 1) * articlesPageSize, curPage * articlesPageSize)
                    .map(item => (
                        <div className="animated bounceInUp" key={item._id}>
                            <div
                                className="art-show-item"
                                onClick={() => turnToArticle(item.titleEng)}
                            >
                                <div className="art-show-title">{item.title}</div>
                                <span className="art-show-date common-hover">
                                    {moment(item.date).format('YYYY-MM-DD')}
                                </span>
                            </div>
                        </div>
                    ))}
                <div className="PageNav-box">
                    <Pagination
                        current={curPage}
                        total={props.articles.filter(item => item.classes === myClass).length}
                        defaultPageSize={articlesPageSize}
                        showSizeChanger={false}
                        showTitle={false}
                        // hideOnSinglePage={true}
                        onChange={page => setCurPage(page)}
                    />
                </div>
            </div>
        </>
    );
};
export default connect(
    state => ({
        articles: state.articles,
    }),
    {}
)(ArtClass);
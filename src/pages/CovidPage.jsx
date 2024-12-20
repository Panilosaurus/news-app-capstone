import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { useEffect, useState } from "react";
import { fetchMovies } from "../store/actions";
import { NEWS_REDUCER_CASES } from "../store/reducers";

function CovidPage() {
  const [search, setSearch] = useState("");
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchMovies({
        q: "Covid-19",
        fq: 'news_desk:("Health")',
      })
    );
  }, []);

  return (
    <main>
      <Navbar
        onChange={(value) => {
          setSearch(value);
          console.log(value);
        }}
        onClick={() => {
          dispatch(
            fetchMovies({
              q: search,
            })
          );
        }}
      />
      <section className={styles.pageContainer}>
        <section>
          <h1>COVID-19 News</h1>
        </section>
        <section className={styles.newsContainer}>
          {newsReducer.news.map((n, i) => {
            const { headline, abstract, source, byline, web_url } = n;
            const isSaved = newsReducer.savedNews.some(
              (saved) => saved._id === n._id
            );
            return (
              <NewsCard
                key={n._id}
                headline={headline.main}
                abstract={abstract}
                source={source}
                author={byline.original}
                onViewNewDetail={web_url}
                isSaved={newsReducer.savedNews.some(
                  (saved) => saved._id === n._id
                )}
                onSave={() => {
                  const isAlreadySaved = newsReducer.savedNews.some(
                    (saved) => saved._id === n._id
                  );
                  if (isAlreadySaved) {
                    const updatedSavedNews = newsReducer.savedNews.filter(
                      (saved) => saved._id !== n._id
                    );
                    dispatch({
                      type: NEWS_REDUCER_CASES.UNSAVE_NEWS,
                      newsId: n._id,
                    });
                    localStorage.setItem(
                      "savedNews",
                      JSON.stringify(updatedSavedNews)
                    );
                  } else {
                    const updatedSavedNews = [...newsReducer.savedNews, n];
                    dispatch({
                      type: NEWS_REDUCER_CASES.SAVE_NEWS,
                      news: n,
                    });
                    localStorage.setItem(
                      "savedNews",
                      JSON.stringify(updatedSavedNews)
                    );
                  }
                }}
              />
            );
          })}
        </section>
      </section>
    </main>
  );
}

export default CovidPage;
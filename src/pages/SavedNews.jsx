import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { useEffect, useState } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { useNavigate } from "react-router-dom";

function SavedNewsPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const newsReducer = useSelector(function (state) {
    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("savedNews", JSON.stringify(newsReducer.savedNews));
  }, [newsReducer.savedNews]);

  return (
    <main>
      <Navbar
        onChange={(value) => {
          setSearch(value);
          console.log(value);
        }}
        onClick={() => {
          if (search.trim()) {
            navigate(`/search?q=${encodeURIComponent(search)}`);
          }
        }}
      />
      <section className={styles.pageContainer}>
        <section>
          <h1>Saved News</h1>
        </section>
        <section className={styles.newsContainer}>
          {newsReducer.savedNews.map((n, i) => {
            const { headline, abstract, source, byline, web_url } = n;
            return (
              <NewsCard
                key={n._id}
                headline={headline.main}
                abstract={abstract}
                source={source}
                author={byline.original}
                onViewNewDetail={web_url}
                onSave={() => {
                  // Menghapus berita dari savedNews di Redux dan localStorage
                  const updatedSavedNews = newsReducer.savedNews.filter(
                    (saved) => saved._id !== n._id // Menghapus berita berdasarkan _id
                  );

                  // Dispatch aksi untuk menghapus berita dari Redux
                  dispatch({
                    type: NEWS_REDUCER_CASES.UNSAVE_NEWS,
                    newsId: n._id, // Mengirim id berita yang akan dihapus
                  });

                  // Update localStorage dengan daftar savedNews yang telah diperbarui
                  localStorage.setItem(
                    "savedNews",
                    JSON.stringify(updatedSavedNews)
                  );
                }}
              />
            );
          })}
        </section>
      </section>
    </main>
  );
}

export default SavedNewsPage;

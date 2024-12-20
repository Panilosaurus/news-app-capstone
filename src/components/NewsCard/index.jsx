import styles from "./NewsCard.module.css";

const truncateChar = (text) => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (i < 150) {
      result += text[i];
    } else {
      break;
    }
  }

  return `${result}..`;
};

function NewsCard(props) {
  const {
    headline,
    abstract,
    source,
    author,
    onSave,
    onViewNewDetail,
    isSaved = true,
  } = props;
  return (
    <section className={styles.newsCard}>
      <h3>{source}</h3>
      <h1>{headline}</h1>
      <h4>{author}</h4>
      <p>{truncateChar(abstract)}</p>

      <div className={styles.buttonContainer}>
        <button className={styles.newsPageButton}>
          <a href={onViewNewDetail} target="_blank" rel="noreferrer">
            News Page
          </a>
        </button>
        <button
          className={styles.saveButton}
          onClick={() => {
            onSave();
          }}
          style={{
            backgroundColor: isSaved ? "red" : "#1265ED", // Warna tombol
            color: "white",
            cursor: "pointer",
          }}
        >
          {isSaved ? "Un-save" : "Save"}
        </button>
      </div>
    </section>
  );
}

export { NewsCard };

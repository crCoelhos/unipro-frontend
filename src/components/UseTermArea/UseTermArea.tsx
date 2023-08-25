import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { UseTermAreaProps } from "../../types";
import styles from "./UseTermArea.module.css";

const UseTermArea: React.FC<UseTermAreaProps> = ({ pdfFile }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const embedRef = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    if (embedRef.current) {
      const numPages =
        embedRef.current?.contentDocument?.querySelectorAll(".page").length;
      setNumPages(numPages || null);
    }
  }, [pdfFile]);

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < (numPages || 0)) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  return (
    <div className={styles.UseTermAreaContainer}>
      {/* <div className={styles.ButtonsContainer}> */}
      {/* <Button onClick={handlePreviousPage}>Anterior</Button> */}
      {/* <span>{currentPage}</span> de <span>{numPages}</span> */}
      {/* <Button onClick={handleNextPage}>Seguinte</Button> */}
      {/* </div> */}
      <div className={styles.UseTermArea}>
        <object
          data={pdfFile}
          type="application/pdf"
          width="100%"
          height="600px"
          ref={embedRef}
        >
          <p>Não foi possivel carregar o termo.</p>
        </object>
      </div>
    </div>
  );
};

export default UseTermArea;

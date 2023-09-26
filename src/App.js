import React, { useState } from "react";
import "./App.css";
import mammoth from "mammoth";

function App() {
  const [crossWord, setCrossWord] = useState("NA");
  const [fieldWord, setFieldWord] = useState("NA");
  const [backgroundWord, setBackgroundWord] = useState("NA");
  const [summaryWord, setSummaryWord] = useState("NA");
  const [drofDraWord, setDroofDraWord] = useState("NA");
  const [detaDesWord, setDetaDesWord] = useState("NA");
  const [claimedWord, setClaimedWord] = useState("NA");
  const [abstractWord, setAbstractWord] = useState("NA");
  const [fileContent, setFileContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFileContent, setShowFileContent] = useState(false);
  const [modifiedTitle, setModifiedTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [imgCount, setImgCount] = useState(0);
  const [dependent, setdependent] = useState(0);
  const [independent, setIndependent] = useState(0);
  const [total, setTotal] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [showClaimContent, setShowClaimContent] = useState(false);
  const [independentClaimLists, setIndependentClaimLists] = useState("");
  const [dependentClaimLists, setDependentClaimLists] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      try {
        const result = await mammoth.extractRawText({ arrayBuffer: content });
        const text = result.value;

        const titleRegx =
          /([\s\S]*?)(cross-reference to related application|CROSS REFERENCE TO RELATED APPLICATIONS|What is claimed is|Claims|CLAIMS|WHAT IS CLAIMED IS|abstract|ABSTRACT|Cross-reference to related application|CROSS-REFERENCE TO RELATED APPLICATION|field|background|summary|description of the drawing|$)/i;
        const titlesec = titleRegx.exec(text);
        if (titlesec) {
          debugger;
          const titlename = titlesec[1];
          const wordss = titlename.split(/\s+/).filter(Boolean);
          setWordCount(wordss.length);
          setModifiedTitle(titlename);
        }
        const crossregex =
          /cross-reference to related application([\s\S]*?)(?:field|background|summary|description of the drawings|detailed description|what is claimed is|abstract|$)/i;
        const crosssec = crossregex.exec(text);
        if (crosssec) {
          const crosssection = crosssec[1];
          const filteredContentforCrossSection = crosssection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForCross = filteredContentforCrossSection
            .split(/\s+/)
            .filter(Boolean);
          const crosswordCount = wordsForCross.length;
          setCrossWord(crosswordCount);
          console.log("aea", crosswordCount);
        }

        const fieldregex =
          /field([\s\S]*?)(?:background|summary|description of the drawings|detailed description|what is claimed is|abstract|cross-reference to related application|$)/i;

        const fieldsec = fieldregex.exec(text);
        if (fieldsec) {
          const fieldsection = fieldsec[1];
          const filteredContentforFieldSection = fieldsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForField = filteredContentforFieldSection
            .split(/\s+/)
            .filter(Boolean);
          const fieldWordCount = wordsForField.length;
          setFieldWord(fieldWordCount);
          console.log("fiel", fieldWordCount);
        }

        const backgrdregex =
          /background([\s\S]*?)(?:summary|description of the drawings|detailed description|what is claimed is|abstract|cross-reference to related application|field|$)/i;
        const backgrdsec = backgrdregex.exec(text);
        if (backgrdsec) {
          const backgrdsection = backgrdsec[1];
          const filteredContentforBackgrdSection = backgrdsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForBackground = filteredContentforBackgrdSection
            .split(/\s+/)
            .filter(Boolean);
          const backgrdWordCount = wordsForBackground.length;
          setBackgroundWord(backgrdWordCount);
          console.log("back", backgrdWordCount);
        }

        const summregex =
          /summary([\s\S]*?)(?:description of the drawing|detailed description|what is claimed is|abstract|cross-reference to related application|field|background|$)/i;
        const summsec = summregex.exec(text);
        if (summsec) {
          const summsection = summsec[1];
          const filteredContentforSumarySection = summsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForSummary = filteredContentforSumarySection
            .split(/\s+/)
            .filter(Boolean);
          const summaryWordCount = wordsForSummary.length;
          setSummaryWord(summaryWordCount);
          console.log("sum", summaryWordCount);
        }

        const dodregex =
          /description of(?: the)? drawing([\s\S]*?)(?:detailed description|what is claimed is|abstract|cross-reference to related application|field|background|summary|$)/i;
        const dodsec = dodregex.exec(text);
        if (dodsec) {
          const dodsection = dodsec[1];
          const filteredContentforDodSection = dodsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForDod = filteredContentforDodSection
            .split(/\s+/)
            .filter(Boolean);
          const dodWordCount = wordsForDod.length;
          setDroofDraWord(dodWordCount);
          console.log("dod", dodWordCount);
        }

        const detDesregex =
          /(?:DETAILED DESCRIPTION|Detailed description)([\s\S]*?)(?:What is claimed is|Claims|WHAT IS CLAIMED IS|CLAIMS|abstract|ABSTRACT|Cross-reference to related application|CROSS-REFERENCE TO RELATED APPLICATION|field|background|summary|description of the drawing|$)/;
        const detDessec = detDesregex.exec(text);
        if (detDessec) {
          const detDessection = detDessec[1];
          const filteredContentforDetDesSection = detDessection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForDetDes = filteredContentforDetDesSection
            .split(/\s+/)
            .filter(Boolean);
          const detDesWordCount = wordsForDetDes.length;
          setDetaDesWord(detDesWordCount);
          console.log("det", detDesWordCount);
        }

        const claimregex =
          /(?:What is claimed is|Claims|CLAIMS|WHAT IS CLAIMED IS)([\s\S]*?)(?:abstract|ABSTRACT|Cross-reference to related application|CROSS-REFERENCE TO RELATED APPLICATION|field|background|summary|description of the drawing|$)/;

        const claimsec = claimregex.exec(text);
        if (claimsec) {
          const claimsection = claimsec[1];
          const linesa = claimsection
            .split(/(?<=\.)\s+/)
            .filter((line) => line.includes("."));
          const filteredLines = linesa.filter(
            (line) => !/^\s*[\d\n\t\s]+\.?$|:\s*\n\n1\./.test(line)
          );
          let independentClaimCount = 0;
          let dependentClaimCount = 0;
          const independentClaims = [];
          const dependentClaims = [];

          for (let i = 0; i < filteredLines.length; i++) {
            const line = filteredLines[i];
            const words = line.split(/\s+/).filter(Boolean);
            const wordCount = words.length;
            if (/claim\s+(\d+)/i.test(line)) {
              dependentClaims.push(`claim ${i + 1} - ${wordCount} words`);
              dependentClaimCount++;
            } else {
              independentClaims.push(`claim ${i + 1} - ${wordCount} words`);
              independentClaimCount++;
            }
          }

          setTotal(filteredLines.length);
          setIndependent(independentClaimCount);
          setdependent(dependentClaimCount);
          setIndependentClaimLists(independentClaims.join("\n"));
          setDependentClaimLists(dependentClaims.join("\n "));

          const filteredContentforClaimSection = claimsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForDetClaim = filteredContentforClaimSection
            .split(/\s+/)
            .filter(Boolean);
          const claimWordCount = wordsForDetClaim.length;
          setClaimedWord(claimWordCount);
          console.log("claim", claimWordCount);
        }

        const abstractregex =
          /(?: Abstract|ABSTRACT)([\s\S]*?)(?:cross-reference to related application|field|background|summary|description of the drawing|What is claimed is|Claims|CLAIMS|$)/;

        const abssec = abstractregex.exec(text);
        if (abssec) {
          const abssection = abssec[1];
          const filteredContentforAbstractSection = abssection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForDetAbs = filteredContentforAbstractSection
            .split(/\s+/)
            .filter(Boolean);
          const absWordCount = wordsForDetAbs.length;

          setAbstractWord(absWordCount);
          console.log("abs", absWordCount);
        }

        const figRegex =
          /description of(?: the)? drawing([\s\S]*?)(?:detailed description|what is claimed is|abstract|cross-reference to related application|field|background|summary|$)/i;

        const descriptionMatches = figRegex.exec(text);
        if (descriptionMatches) {
          const descriptionText = descriptionMatches[1];
          const imageRegex1 =
            /(?:FIG(?:URE)?)\.?[-\s]?\d+[A-Z]?(?:\([\w\s]+\))?\b/gi;

          const matches = descriptionText.match(imageRegex1);
          const uniqueMatches = [...new Set(matches)];
          console.log("aa", uniqueMatches);
          const Rx1 = uniqueMatches.length;
          setImgCount(Rx1);

          const imageRegex =
            /FIGS\.\s?\d+([A-Za-z\(\)]+)?\s?(?:to(?!.*and)|-(?!.*and))\s?\d+([A-Za-z\(\)]+)?/gi;
          const matches1 = descriptionText.match(imageRegex);
          const uniqueMatches1 = [...new Set(matches1)];
          console.log("jii", uniqueMatches1);
        }
        setFileContent(text);
        setSentenceCount(text.split(/[.]+/).length);
        setLineCount(text.split("\n").length);

        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error reading the .docx file.");
      }
    };

    reader.onerror = () => {
      setErrorMessage("Error reading the file.");
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App">
      <h1>File Data Calculation</h1>
      <input type="file" onChange={handleFileChange} />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="result">
        <p>Title: {modifiedTitle}</p>
        <p> Count of the Title :{wordCount}</p>
      </div>
      <div className="result">
        <p>Cross-Reference Section: {crossWord}</p>
        <p>Field Section:{fieldWord}</p>
        <p>Background Section:{backgroundWord}</p>
        <p>Summary Section : {summaryWord}</p>
        <p>Description of Drawing : {drofDraWord}</p>
        <p> Detailed Description : {detaDesWord}</p>
        <p>Claims Section :{claimedWord}</p>
        <p>Abstract Section : {abstractWord}</p>
        <p>Total Number of Figures:{imgCount}</p>
        <p>Total lines: {lineCount}</p>
        <p>
          Total word count: {fileContent.split(/\s+/).filter(Boolean).length}
        </p>
        <p>Total character count: {fileContent.replace(/\s/g, "").length}</p>
        <p>Total sentence count: {sentenceCount}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "2%",
        }}
      >
        <div>
          <button onClick={() => setShowFileContent(!showFileContent)}>
            {showFileContent ? "hide" : "view"} the content
          </button>
        </div>
        <div>
          <button onClick={() => setShowClaimContent(!showClaimContent)}>
            {showClaimContent ? "hide" : "view"} Claims Details
          </button>
        </div>
      </div>

      {showFileContent && (
        <div className="file-content">
          <h2>File Content:</h2>
          <pre>
            <p>{fileContent}</p>
          </pre>
        </div>
      )}

      {showClaimContent && (
        <div className="claim-content">
          <h2>CLAIMS:</h2>
          <p>Total Claims:{total}</p>
          <p>Independent Claims:{independent}</p>
          <p>Dependent Claims:{dependent}</p>
          <p>
            <b>Independent Claims List:</b>
          </p>
          <pre>{independentClaimLists}</pre>
          <p>
            <b>Dependent Claims:</b>
          </p>
          <pre>{dependentClaimLists}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

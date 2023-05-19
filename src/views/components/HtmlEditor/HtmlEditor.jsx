import React, { lazy, Suspense } from "react";
import Row from "antd/es/row";
import Col from "antd/es/col";
import { htmlToKatex } from "../../../utils/utils";
const CKEditor = lazy(() => import("ckeditor4-react"));
const MobilePreview = lazy(() => import("../MobilePreview/MobilePreview"));

export default function HtmlEditor({
  content,
  previewContent,
  editorCol,
  previewCol,
  editorName,
  setData,
  setDataHtml,
}) {
  return (
    <Row>
      <Col span={editorCol}>
        <Suspense fallback={<div>Loading...</div>}>
          <CKEditor
            editorName={editorName}
            data={content}
            onChange={async (e) => {
              setData(e.editor.getData());
              setDataHtml(await htmlToKatex(e.editor.getData()));
            }}
          />
        </Suspense>
      </Col>
      <Col span={previewCol}>
        <Suspense fallback={<div>Loading...</div>}>
          <MobilePreview content={previewContent} />
        </Suspense>
      </Col>
    </Row>
  );
}

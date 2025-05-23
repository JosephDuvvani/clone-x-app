const isEmpty = (body) => {
  if (!body || body == "") return true;
  const trimmed = body.content?.filter(
    (para) => para.content && para.content[0].text.trim() !== ""
  );
  return trimmed.length === 0;
};

export { isEmpty };

export function jsonContentParser(req, body, done) {
  try {
    const json = JSON.parse(body as string);
    done(null, json);
  } catch (err) {
    err.statusCode = 400;
    done(err, undefined);
  }
}

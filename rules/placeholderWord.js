const PLACEHOLDER_WORDS = ["test", "testing", "tester", "admin", "administrator", "root", "superuser", "sysadmin", "user", "username", "guest", "anonymous", "anon", "demo", "sample", "example", "dummy", "placeholder", "abc", "xyz", "foo", "bar", "baz", "qux", "foobar", "name", "firstname", "lastname", "fullname", "yourname", "email", "youremail", "test@test.com", "user@example.com", "lorem", "ipsum", "null", "none", "undefined", "na", "n/a", "one", "two", "three", "hello", "hey", "hi", "blah", "stuff", "thing", "whatever"];

export function placeholderWordRule(value, customWords = []) {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  const allWords = customWords.length > 0
    ? [...PLACEHOLDER_WORDS, ...customWords.map(w => w.toLowerCase())]
    : PLACEHOLDER_WORDS;

  if (allWords.includes(normalized)) {
    return "Input looks like a placeholder word";
  }

  return null;
}
export function convertPath(originPath: string, relativePath: string) {
  // Use absolute path if specified
  if (relativePath.indexOf('/') === 0) {
    return relativePath;
  }

  const originSplit = originPath.split('/');
  const relativeSplit = relativePath.split('/');
  // if origin path is a file, remove it so it's a directory
  if (originSplit[originSplit.length - 1].includes('.')) {
    originSplit.pop();
  }
  return originSplit.concat(relativeSplit).join('/');
}

import {Source} from 'react-native-fast-image';

export function getImage(source: Source | string): Source {
  if (typeof source === 'string') {
    return <any>{
      uri: source,
      cache: 'immutable',
    };
  } else if (typeof source === 'object') {
    return source;
  }

  return source;
}

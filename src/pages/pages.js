import DragAndDrop from './DragAndDrop';
import AutoTyper from './AutoTyper';
import AutoSave from './AutoSave';
import AutoSearch from './AutoSearch';
import Cancellable from './Cancellable';
import AutoRetry from './AutoRetry';
import VideoPopOutWithScroll from './VideoPopOutWithScroll';

const Pages = [
  { component: DragAndDrop, path: '/drag-and-drop' },
  { component: AutoTyper,   path: '/auto-typer' },
  { component: AutoSave,    path: '/auto-save' },
  { component: AutoSearch,  path: '/auto-search' },
  { component: Cancellable, path: '/cancellable' },
  { component: AutoRetry,   path: '/auto-retry' },
  { component: VideoPopOutWithScroll, path: '/video-popout-with-scroll' }
];

export default Pages;

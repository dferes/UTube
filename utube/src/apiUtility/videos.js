import UTubeApi from '../api';

const setVideoView = async (view) => {
  await UTubeApi.setVideoView(view);
}

const getVideo = async (id) => {
  return await UTubeApi.getVideo(id);
}

const videoSearch = async (filter={}) => {
  return await UTubeApi.videoSearch(filter);
}

export { setVideoView, getVideo, videoSearch };
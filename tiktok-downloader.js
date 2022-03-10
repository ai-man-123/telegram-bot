const axios = require('axios')
const cheerio = require('cheerio')

const headers = {
  'Accept': '*/*',
  'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
}

const fetchVideoId = async (url) => {
  try {
    const { data } = await axios.get(url, { headers })
    const $ = cheerio.load(data)
    const link = $('link[rel="canonical"]').attr('href')
    const videoId = link.split('/')
    return videoId[videoId.length - 1]
  } catch(e) {
    console.log(e)
  }
}

const getVideoLink = async (videoId) => {
  try {
    const requestUrl = `https://api2.musical.ly/aweme/v1/aweme/detail/?aweme_id=${videoId}`
    const { data } = await axios.get(requestUrl, { headers })
    const uri = data.aweme_detail.video.download_addr.uri
    const videoLink = `https://api2-16-h2.musical.ly/aweme/v1/play/?video_id=${uri}&vr_type=0&is_play_url=1&source=PackSourceEnum_PUBLISH&media_type=4`
    return videoLink
  } catch(e) {
    console.log(e)
  }
}

const downloadVideo = async (url) => {
  const videoId = await fetchVideoId(url)
  const videoLink = await getVideoLink(videoId)
  return videoLink
}

module.exports = downloadVideo

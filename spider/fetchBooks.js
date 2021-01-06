//抓取豆瓣读书中的数据信息
const axios=require('axios').default;
const cheerio=require('cheerio');
const { connected } = require('process');
const Book=require('../models/Book');



/**
 * 获取豆瓣读书网页源代码
 */
async function getBooksHTML(){
    const resp=await axios.get('https://book.douban.com/latest');
    return resp.data;
}

/**
 * 从豆瓣读书中得到一个完整的网页，并从网页中分析出书籍的基本信息，然后得到一个书籍详情页链接数组
 */
async function getBookLinks(){
    const html=await getBooksHTML();
    const $=cheerio.load(html)
    const achorElements=$("#content .grid-12-12 li a.cover");
    // console.log(achorElements)
    const links=achorElements.map((i,ele)=>{
        const href=ele.attribs['href'];//得到所有书籍详情页链接
        return href;
    }).get();//jquery中的.get()方法：得到数组的某一项，不传参表示得到一个真实的数组
    return links;
}

/**
 * 根据书籍详情页的url地址，得到数据的详细信息
 * @param {*} detailUrl 
 */
async function getBookDetail(detailUrl){
    const resp=await axios.get(detailUrl);
    const $=cheerio.load(resp.data);
    const name=$('h1').text().trim();
    const imgurl=$("#mainpic .nbg img").attr('src');
    const spans=$("#info span.pl")
    const autorSpans=spans.filter((i,ele)=>{
        return $(ele).text().includes('作者')
    });
    const author=autorSpans.next('a').text()

    const publishSpan=spans.filter((i,ele)=>{
        return $(ele).text().includes('出版年')
    });
    const publishDate=publishSpan[0].nextSibling.nodeValue.trim();

    return {
        publishDate,
        name,
        imgurl,
        author
    }
}

/**
 * 得到书籍的所有信息
 */
async function fetchAll(){
    const links=await getBookLinks();//得到数据详情页地址
    const proms=links.map((link)=>{
        return getBookDetail(link);
    });
    return Promise.all(proms);
} 


async function saveToDB(){
    const books=await fetchAll();
    await Book.bulkCreate(books);
    console.log('抓取数据并保存到了数据库') 
}
saveToDB()

// fetchAll().then((books)=>{
//     console.log(books)
// })

// getBookDetail('https://book.douban.com/subject/35235876/')
// getBookLinks().then((links)=>{
//     console.log(links);
// })
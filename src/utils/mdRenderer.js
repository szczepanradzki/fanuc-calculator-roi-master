import MarkdownIt from 'markdown-it';

export const markdownText = (text) => {
    const md = new MarkdownIt();
    md.set({
        html: true,
        xhtmlOut: true,
        breaks: true,
        langPrefix: 'markdown__',
        linkify: true,
        typographer:  true,
    })
    return md.render(text);
};

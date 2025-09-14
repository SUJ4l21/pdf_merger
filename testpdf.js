import PDFMerger from 'pdf-merger-js';

const merge = async (files) => {
    var merger = new PDFMerger();
    for (const file of files) {
        await merger.add(file);
    }
    let d = new Date().getTime();
    await merger.save(`public/${d}.pdf`)
    return d;
    
};
export { merge };
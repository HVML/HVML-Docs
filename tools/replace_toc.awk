BEGIN {
    toc = 0
}

{
    if (match ($0, /\[\/\/\]/)) {
        if (match ($0, /START OF TOC\)$/, fields)) {
            print $0

            while ((getline line < "toc.tmp") > 0)
                print line

            toc = 1
        }
        else if (match ($0, /END OF TOC\)$/, fields)) {
            toc = 0
        }
    }

    if (toc == 0) {
        print $0
    }
}

END { }

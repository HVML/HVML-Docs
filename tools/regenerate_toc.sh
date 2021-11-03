#!/bin/sh

usage()
{
    echo "    $0 <a_file_in_markdown>"
}

if [ $# -lt 1 ]
then
    echo "Please specify a file in Markdown:"
    usage
    exit 1
fi

if [ -f $1 ]
then
    echo "Renumbering subtitles and regenerating TOC of file: $1..."
else
    echo "Please specify a regular file: "
    usage
    exit 2
fi

work_dir=`dirname "$0"`
gawk -f $work_dir/number_subtitles.awk $1 > renumbered.tmp
gawk -f $work_dir/generate_toc.awk renumbered.tmp > toc.tmp
gawk -f $work_dir/replace_toc.awk renumbered.tmp > regenerated.tmp

if [ $? -eq 0 ]
then
    mv regenerated.tmp $1
    rm *.tmp
    echo "Done."
else
    echo "Failed."
fi


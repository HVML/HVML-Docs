BEGIN {
    no_l2 = 0
    no_l3 = 0
    no_l4 = 0
    no_l5 = 0
    no_l6 = 0
    no_li = 0
}

{
    if (match ($0, /^(#+) ([[:digit:]\.]+\)) (.*)/, fields)) {
        level = fields[1]
        number = fields[2]
        title = fields[3]

        no_li = 0;
        switch (length(level)) {
        case 1:
            print $0
            break;

        case 2:
            no_l2 += 1
            no_l3 = 0
            no_l4 = 0
            no_l5 = 0
            no_l6 = 0
            print level " " no_l2 ") " title
            break;

        case 3:
            no_l3 += 1
            no_l4 = 0
            no_l5 = 0
            no_l6 = 0
            print level " " no_l2 "." no_l3 ") " title
            break;

        case 4:
            no_l4 += 1
            no_l5 = 0
            no_l6 = 0
            print level " " no_l2 "." no_l3 "." no_l4 ") " title
            break;

        case 5:
            no_l5 += 1
            no_l6 = 0
            print level " " no_l2 "." no_l3 "." no_l4 "." no_l5 ") " title
            break;

        case 6:
            no_l6 += 1
            print level " " no_l6 ") " title
            break;

        default:
            print $0
            break;
        }
    }
    else if (match ($0, /^([[:digit:]]+\)) (.*)/, fields)) {
        title = fields[2]

        no_li += 1
        print no_li ") " title
    }
    else {
        print $0
    }
}

END {
}

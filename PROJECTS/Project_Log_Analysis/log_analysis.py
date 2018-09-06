#!/usr/bin/env python3

import psycopg2

DBNAME = "news"


request_1 = "Most popular three articles of all time:"

query_1 = """select title,count(*) as views
            from articles,log_slug
            where articles.slug=log_slug.substring
            group by articles.title
            order by views desc limit 3;
         """

request_2 = "Most popular article authors of all time:"

query_2 = """select auth.name,count(*) as num_views
             from authors auth,articles art,log_slug
             where auth.id = art.author and art.slug=log_slug.substring
             group by auth.name
             order by num_views desc;
          """

request_3 = "Days when more than 1% of requests lead to errors:"

query_3 = """select to_char(time, 'Mon DD, YYYY'),
             percentage_fail::numeric(4,2)
             from percentage_count
             where percentage_fail > 1;
          """


def get_queryResults(sql_query):
    """
    Connect to the database and send query to get results
    """
    db = psycopg2.connect(database=DBNAME)
    c = db.cursor()
    c.execute(sql_query)
    results = c.fetchall()
    db.close()
    return results


result1 = get_queryResults(query_1)
result2 = get_queryResults(query_2)
result3 = get_queryResults(query_3)


def print_results(q_list):
    """
    To print results
    """
    for i in range(len(q_list)):
        title = q_list[i][0]
        res = q_list[i][1]
        print("\t" + "%s - %d" % (title, res) + " views")
    print("\n")


if __name__ == '__main__':
    print(request_1 + "\n")
    print_results(result1)
    print(request_2 + "\n")
    print_results(result2)
    print(request_3 + "\n")
    print("\t" + str(result3[0][0]) + " - " + str(result3[0][1]) + "% errors")
